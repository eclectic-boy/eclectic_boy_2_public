from eclectic_boy import settings as app_settings


def settings(request):  # pylint: disable=unused-argument
    return {
        'settings': app_settings.__dict__
    }
