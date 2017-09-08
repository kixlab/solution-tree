from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import solutionForm
from .models import solution, node, sub_how_to, problem, annotation, answer
from binascii import a2b_base64
from django.http import JsonResponse

def get_dict_problem(problem_pk):
    prob = problem.objects.get(pk=problem_pk)
    return {'text' : prob.text, 'prob_img' : prob.img}

def solve(request, problem_pk):
    # return HttpResponse('안녕하세요')
    if request.method=="POST":
        form = solutionForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save()
            obj.problem = problem.objects.get(pk=problem_pk)
            obj.save()
        return redirect(obj)
    else:
        form = solutionForm()
    data_dict = get_dict_problem(problem_pk)
    data_dict['form'] = form
    return render(request, 'solve.html', data_dict)

def check(request, pk):
    print("in check fn")
    try:
        cursol = solution.objects.get(pk=pk)
    except solution.DoesNotExist:
        return HttpResponse("잘못된 request입니다.")
    return render(request, 'check.html', {'img_url':cursol.img.url})

def tag(request, problem_pk, pk):
    try:
        cursol = solution.objects.get(pk=pk)
    except solution.DoesNotExist:
        return HttpResponse("잘못된 request입니다.")
    data_dict = get_dict_problem(problem_pk)
    if request.method=="POST":
        print("here")
        for key,value in request.POST.items():
            data_dict[key]  = value
    data_dict['img'] = cursol.img
    data_dict['data'] = data_dict
    return render(request, 'tag.html', data_dict)

def make_config(parent_config, parent_pk, only_img):
    ret_list = [parent_config]
    childs = node.objects.filter(parentId = parent_pk)
    if len(childs) ==0:
        parent_config['HTMLclass'] += ' leaf'
    for child in childs:
        # print(child)
        child_config = {
            'parent_pk' : parent_pk,
            'pk' : child.pk,
            'parent' : parent_config,
            'HTMLclass' : 'childnode selectable',
            'text' : {
                'name' : child.summarization,
            },
            'HTMLid' : 'node_'+str(child.pk),
        }
        ret_list.extend(make_config(child_config, child.pk, check))
    if not check :
        add_config = {
            'parent_pk' : parent_pk,
            'parent' : parent_config,
            'HTMLclass' : 'addsum',
            'image' : '/assets/img/plus.png',
            'text' : {
                'name' : ' Make new step',
            },
        }
        ret_list.append(add_config)
    return ret_list

def select(request, problem_pk, pk):
    data_dict = {}
    cursol = solution.objects.get(pk=pk)
    cur_prob = problem.objects.get(pk=problem_pk)
    if request.POST:
        subs = sub_how_to.objects.filter(orig_sol=cursol)
        subs.delete()
        for key,value in request.POST.items():
            if key=='tag_img':
                path = 'edit/tagged_'+str(pk)+'.jpg'
                binary_data = a2b_base64(value[22:])
                fd = open('uploads/' + path, 'wb')
                fd.write(binary_data)
                fd.close()
                print(cursol.img)
                cursol.tagged_img = path
                cursol.save()
            elif 'sum' in key:
                index = int(key.replace('sum', '')) +1
                print(index)
                temp_sub = sub_how_to(orig_sol=cursol, text=value, order=index)
                temp_sub.save()
                data_dict[key]  = value
    else:
        subs = sub_how_to.objects.filter(orig_sol=cursol)
        for sub in subs:
            data_dict['sum'+str(sub.order-1)] = sub.text
    config = {
        'container' : "#div-soltree",
        'connectors' : {
            'type' : 'step'
        },
        'node' : {
            'HTMLclass' : 'nodeExample1',
        },
    }
    chart_config = [config]
    root = node.objects.get(parentId=None, problem=cur_prob)
    root_config = {
        'pk' : root.pk,
        'text' : {
            'name' : 'Start',
        },
        'HTMLid' : 'node_'+str(root.pk),
        'HTMLclass' : 'root',
    }
    tree_list = make_config(root_config, root.pk, True)
    chart_config.extend(tree_list)
    tot_dict = get_dict_problem(problem_pk)
    tot_dict['data'] = data_dict
    tot_dict['chart_config'] = chart_config
    return render(request, 'select.html', tot_dict)


def explore(request, problem_pk):
    for key,value in request.POST.items():
        print(key, value)
    cur_prob = problem.objects.get(pk=problem_pk)
    config = {
        'container' : "#div-soltree",
        'connectors' : {
            'type' : 'step'
        },
        'node' : {
            'HTMLclass' : 'nodeExample1',
        },
    }
    chart_config = [config]
    root = node.objects.get(parentId=None, problem=cur_prob)
    root_config = {
        'pk' : root.pk,
        'text' : {
            'name' : 'Start',
        },
        'HTMLid' : 'node_'+str(root.pk),
        'HTMLclass' : 'root',
    }
    tree_list = make_config(root_config, root.pk, True)
    chart_config.extend(tree_list)
    tot_dict = get_dict_problem(problem_pk)
    tot_dict['chart_config'] = chart_config
    return render(request, 'explore.html', tot_dict)

def get_annotations(request):
    node_pk = int(request.GET.get('node_pk'))
    cur_node = node.objects.get(pk=node_pk)
    inst_note = annotation.objects.get(is_inst=True, node=cur_node).text
    student_notes = annotation.objects.filter(node=cur_node, is_inst=False)
    student_dict = {}
    student_dict['len'] = len(student_notes)
    for i in range(len(student_notes)):
        student_dict[str(i)] = student_notes[i].text
    data = {
        'inst' : inst_note,
        'student_dict' : student_dict
    }
    return JsonResponse(data)

def tutorial_solve(request):
    if request.method=="POST":
        print(1)
        # obj = problem.objects.get(pk=42)
        return tag(request, 2, 42)
    else:
        form = solutionForm()
    data_dict = get_dict_problem(2)
    data_dict['form'] = form
    return render(request, 'solve.html', data_dict)

def check_answer(request):
    problem_pk = int(request.GET.get('problem_pk'))
    cur_problem = problem.objects.get(pk=problem_pk)
    cur_answer = answer.objects.filter(problem=cur_problem)
    data = {}
    if cur_answer.exists():
        data['exist'] = '1'
        data['img_url'] = cur_answer[0].img.url
        data['text'] = cur_answer[0].text
    else:
        data['exist'] = '0'
    return JsonResponse(data)

def tutorial_tag(request):
    pass
# Create your views here.
