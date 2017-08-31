from __future__ import unicode_literals
from django import forms
from .models import solution

class solutionForm(forms.ModelForm):
    class Meta:
        model  = solution
        fields = ('img',)
