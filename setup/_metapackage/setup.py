import setuptools

with open('VERSION.txt', 'r') as f:
    version = f.read().strip()

setuptools.setup(
    name="odoo11-addons-oca-website-themes",
    description="Meta package for oca-website-themes Odoo addons",
    version=version,
    install_requires=[
        'odoo11-addon-website_theme_flexible',
    ],
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Odoo',
    ]
)
