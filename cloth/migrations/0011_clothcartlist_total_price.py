# Generated by Django 4.2.7 on 2024-01-18 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cloth', '0010_alter_cloth_rating_alter_clothcartlist_rating_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothcartlist',
            name='total_price',
            field=models.IntegerField(default=0),
        ),
    ]
