from django.contrib import admin
from .models import problem, solution, node, annotation, node_text, sub_how_to

admin.site.register(problem)
admin.site.register(solution)
admin.site.register(node)
admin.site.register(sub_how_to)
admin.site.register(annotation)
admin.site.register(node_text)


# Register your models here.
