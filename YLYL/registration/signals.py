from django.contrib.auth.signals import user_login_failed
from django.dispatch import receiver
from django.contrib import messages


@receiver(user_login_failed)
def on_user_login_failed(sender, credentials, request, **kwargs):
    print("test signal")
    messages.add_message(request, messages.WARNING, "Login failed")
