import setuptools

with open('VERSION.txt', 'r') as f:
    version = f.read().strip()

setuptools.setup(
    name="odoo13-addons-oca-website-themes",
    description="Meta package for oca-website-themes Odoo addons",
    version=version,
    install_requires=[
        'odoo13-addon-theme_kaizen',
    ],
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Odoo',
        'Framework :: Odoo :: 13.0',
    ]
)
