# Generated by Django 4.2.7 on 2024-01-25 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cloth', '0012_remove_clothcartlist_total_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='cloth/images'),
        ),
    ]