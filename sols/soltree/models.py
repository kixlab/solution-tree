from django.db import models
from django.core.urlresolvers import reverse_lazy

class problem(models.Model):
    img = models.ImageField(upload_to='problem', null=True, blank=True)
    text = models.CharField(max_length=1000)
    def __str__(self):
        return str(self.text)

class solution(models.Model):
    img = models.ImageField(upload_to='orig')
    tagged_img = models.ImageField(upload_to='tag', null=True, blank=True)
    problem = models.ForeignKey(problem, on_delete=models.CASCADE, null=True)
    def get_absolute_url(self):
        url = reverse_lazy('tag', kwargs={'problem_pk': self.problem.pk, 'pk': self.pk})
        return url
    def __str__(self):
        return str(self.pk)


class node(models.Model):
    parentId = models.ForeignKey('self', null=True, blank=True)
    summarization = models.CharField(max_length=100)
    def __str__(self):
        return self.summarization

class annotation(models.Model):
    node_pk = models.ForeignKey(node, on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    # is_instructor = models.BooleanField()

class node_text(models.Model):
    node_pk = models.ForeignKey(node, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

class sub_how_to(models.Model):
    orig_sol = models.ForeignKey(solution, on_delete=models.CASCADE)
    text = models.CharField(max_length=100, null=True)
    order = models.IntegerField()
# Create your models here.
