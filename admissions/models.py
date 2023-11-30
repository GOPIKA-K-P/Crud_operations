from django.db import models

class Patient(models.Model):
    name = models.CharField(max_length=255)
    admission_date = models.DateField()
    diagnosis = models.TextField()
    # Add other fields as needed
