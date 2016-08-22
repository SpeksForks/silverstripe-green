## Getting started
There are just two things you need to get started -- a single page type, and any number of design modules.

### Create a "green" page type
In most cases, you should only need one page type that will serve as a container for all of your different design modules. This is done with an extension at the data level, and a parent class at the controller level.

_MyGreenPageType.php_
```php
class MyGreenPageType extends Page
{
	private static $extensions = [
		// Defines the type of serialised data. "JSON" or "YAML" (default is YAML)
		"GreenExtension('YAML')" 
	];
}

class MyGreenPageType_Controller extends UncleCheese\Green\Controller
{

}
```

### Create a design module

A design module is a folder that contains a single template, a content file (YAML, or JSON), and along with any number of CSS, Javascript, and images it requires.

#### Configure your design folder

First, define the directory where we will keep our design modules:

```yaml
UncleCheese\Green\Green:  
  design_folder: '$ThemeDir/green'
```
_The `$ThemeDir` variable can be used as a placeholder for `themes/my-theme`, just the global template variable._

#### Create a design module folder

Now, create a subfolder in that directory. Its name will become a unique identifier for that design. *Each design module must contain `index.ss`*, and optionally `content.yml` or `content.json` to supply its custom fields.

*Example:*
```
themes/
    my-theme/
        green/
            my-awesome-design/
                index.ss
                content.yml
                style.css
                behaviour.js
```

Any `.css` or `.js` files will be automatically loaded.

#### Create a template

Now lets's create a simple template. Don't worry about the fields. Those will come from our YAML file.

_themes/my-theme/green/my-awesome-design/index.ss_
```html
<h2>Hello, welcome to is $Title</h2>
<h3>Here are the $Items.count products we have on special today:</h3>
<ul>
	<% loop $Items %>
	<li>$Title ($Price.Nice)</li>
	<% end_loop %>
</ul>
```

#### Supply some content

There are two ways we can feed content to the template. The simplest (and perhaps the most austere) way of providing content is through a YAML or JSON file in the design module.

_themes/my-theme/green/my-awesome-design/content.yml_
```yaml
Title: "Paul's Pet Shop"
Items:
  -
    Title: Lionfish
    Price: 40.00
  -
    Title: Clownfish
    Price: 10.00
```

Alernatively, if you want to be able to edit the content in the CMS, you can omit this file.

### Insert the page type into the site tree

In the CMS, create a new page of type `MyGreenPageType` (or whatever you called it). Click on the *Content & Design* tab.

Select from one of the design modules you've created.

If the module has its own content file, it will tell you so.

![screenshot1](screenshot1.png?raw=true)

Otherwise, you'll be prompted to create some data.

![screenshot1](screenshot2.png?raw=true)

That's it!

![screenshot1](screenshot3.png?raw=true)

## What about casting?

You can do that!
 
```yaml
Title: Clownfish
Price: Currency|10
DateArrived: Date|2016-02-05
```

The module that provides the ability to traverse text fields as serialised data is [silverstripe-serialised-dbfields](http://github.com/unclecheese/silverstripe-serialised-dbfields). Read the docs for more information.

## Direct module access

For the hardcore treehuggers, you can actually configure your module to be directly accessible by URL, meaning *you don't have to create an entry in the site tree*. This is very useful for prototyping.

To do that, create a `config.yml` file in the design module, and define `public_url`.

_themes/my-theme/green/my-great-design/config.yml_
```yaml
public_url: share/the/love
```

For obvious reasons, this feature only works if the module has a content file, as CMS access is out of the question.

## Troubleshooting

Ring Uncle Cheese.


