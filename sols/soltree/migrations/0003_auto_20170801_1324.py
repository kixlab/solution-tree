# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-01 04:24
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soltree', '0002_auto_20170801_1321'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='node',
            name='prob_id',
        ),
        migrations.RemoveField(
            model_name='solution',
            name='prob_id',
        ),
        migrations.DeleteModel(
            name='problem',
        ),
    ]