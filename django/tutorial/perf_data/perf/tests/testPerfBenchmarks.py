from django.test import TestCase
from django.db.utils import IntegrityError
from django.db import transaction

from django.test import TestCase
from ..models import perfBenchmark

class addBenchmark(TestCase):
    def test_insert(self):
        
        b = perfBenchmark(name="benchio")
        b.save()

        self.assertTrue( b.id is not None )

        b.delete()


    def test_insert_duplicate(self):
        b = perfBenchmark(name="benchio")
        b.save()

        errorTriggered=False
        
        b2 = perfBenchmark(name="benchio")
        self.assertRaises(  IntegrityError,b2.save)
    
    




