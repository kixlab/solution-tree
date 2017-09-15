"""sols URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from soltree.views import refine_node, add_node, add_note, solve, check, tag, select, explore, tutorial_solve, tutorial_tag, get_annotations, check_answer, index
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^problem(?P<problem_pk>[0-9]+)/solve/$', solve),
    url(r'^problem(?P<problem_pk>[0-9]+)/check/(?P<pk>[0-9]+)/$', check, name="check"),
    url(r'^problem(?P<problem_pk>[0-9]+)/tag/(?P<pk>[0-9]+)/$', tag, name="tag"),
    url(r'^problem(?P<problem_pk>[0-9]+)/select/(?P<pk>[0-9]+)/$', select, name='select'),
    url(r'^problem(?P<problem_pk>[0-9]+)/explore/$', explore, name='explore'),
    url(r'^index/$', index, name='index'),
    url(r'^ajax/get_annotations/$', get_annotations, name='get_annotations'),
    url(r'^ajax/check_answer/$', check_answer, name='check_answer'),
    url(r'^ajax/add_node/$', add_node, name='add_node'),
    url(r'^ajax/add_note/$', add_note, name='add_note'),
    url(r'^ajax/refine_node/$', refine_node, name='refine_node'),
    url(r'^tutorial', tutorial_solve, name='tutorial'),
]
urlpatterns += static('upload_files', document_root=settings.MEDIA_ROOT)
