import os
import django
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import game.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'YLYL.settings')
application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            game.routing.websocket_urlpatterns
        )
    ),
})
