# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-01 04:21
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('soltree', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='parentId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='soltree.node'),
        ),
        migrations.AlterField(
            model_name='node',
            name='prob_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='soltree.problem'),
        ),
        migrations.AlterField(
            model_name='problem',
            name='text',
            field=models.CharField(max_length=1000),
        ),
    ]
