from django.db import models
from django.core.urlresolvers import reverse_lazy

class solution(models.Model):
    img = models.ImageField(upload_to='orig')

    def get_absolute_url(self):
        url = reverse_lazy('tag', kwargs={'pk': self.pk})
        return url

class node(models.Model):
    parentId = models.ForeignKey('self', null=True, blank=True)
    summarization = models.CharField(max_length=100)

    def __str__(self):
        return self.summarization

class sub_how_to(models.Model):
    orig_sol = models.ForeignKey(solution, on_delete=models.CASCADE)
    node_id = models.ForeignKey(node)
    img_slice = models.ImageField(upload_to='slice')
    order = models.IntegerField()
# Create your models here.
