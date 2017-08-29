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
from soltree.views import solve, check, tag, select, submit
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^problem/solve/$', solve),
    url(r'^problem/check/(?P<pk>[0-9]+)/$', check, name="check"),
    url(r'^problem/tag/(?P<pk>[0-9]+)/$', tag, name="tag"),
    url(r'^problem/select/(?P<pk>[0-9]+)/$', select, name='select'),
    url(r'^problem/submit/$', submit, name='submit'),
]
urlpatterns += static('upload_files', document_root=settings.MEDIA_ROOT)
