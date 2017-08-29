from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import solutionForm
from .models import solution, node

def solve(request):
    # return HttpResponse('안녕하세요')
    print('in solve fn')
    if request.method=="POST":
        form = solutionForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save()
        return redirect(obj)
    else:
        form = solutionForm()
    return render(request, 'solve.html', {'form':form,})

def check(request, pk):
    print("in check fn")
    try:
        cursol = solution.objects.get(pk=pk)
    except solution.DoesNotExist:
        return HttpResponse("잘못된 request입니다.")
    return render(request, 'check.html', {'img_url':cursol.img.url})

def tag(request, pk):
    try:
        cursol = solution.objects.get(pk=pk)
    except solution.DoesNotExist:
        return HttpResponse("잘못된 request입니다.")
    tot_dict = {}
    data_dict = {}
    if request.method=="POST":
        print("here")
        for key,value in request.POST.items():
            data_dict[key]  = value
    tot_dict['img'] = cursol.img
    tot_dict['data'] = data_dict
    print(tot_dict['data'])
    return render(request, 'tag.html', tot_dict)

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

def select(request, pk):
    data_dict = {}
    for key,value in request.POST.items():
        data_dict[key]  = value
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
    root = node.objects.get(parentId=None)
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
    return render(request, 'select.html', {'chart_config':chart_config, 'data' : data_dict})


def submit(request):
    for key,value in request.POST.items():
        print(key, value)
    return HttpResponse("Thank you for testing!")
# Create your views here.
