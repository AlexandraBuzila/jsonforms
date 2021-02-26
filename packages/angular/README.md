# JSON Forms - More Forms. Less Code

### Complex Forms in the blink of an eye

JSON Forms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

## Angular Package

This is the JSON Forms Angular package which provides the necessary bindings for Angular. It uses [JSON Forms Core](https://www.npmjs.com/package/@jsonforms/core).

You can combine the Angular package with any Angular-based renderer set you want, for example the [Material Renderers](https://www.npmjs.com/package/@jsonforms/angular-material).

See the official [documentation](https://jsonforms.io/) and the JSON Forms Angular [seed repository](https://github.com/eclipsesource/jsonforms-angular-seed) for examples on how to integrate JSON Forms with your application.

Check <https://www.npmjs.com/search?q=%40jsonforms> for all published JSON Forms packages.

### Usage

Use the `JsonForms` component to render a form for your data.

Mandatory props:

* `data: any` - the data to show
* `renderers: JsonFormsRendererRegistryEntry[]` - the Angular renderer set to use

Optional props:

* `schema: JsonSchema` - the data schema for the given data. Will be generated when not given.
* `uischema: UISchemaElement` - the UI schema for the given data schema. Will be generated when not given.
* `cells: JsonFormsCellRendererRegistryEntry[]` - the Angular cell renderer set to use
* `config: any` - form-wide options. May contain default ui schema options.
* `readonly: boolean` - whether all controls shall be readonly.
* `uischemas: JsonFormsUiSchemaEntry[]` - registry for dynamic ui schema dispatching
* `validationMode: 'ValidateAndShow' | 'ValidateAndHide' | 'NoValidation'` - the validation mode for the form
* `ajv: AJV` - custom Ajv instance for the form
* `refParserOptions: RefParserOptions` - configuration for ref resolving
* `onChange` - callback which is called on each data change, containing the updated data and the validation result.

Example component file `app.component.ts`:

```ts
import { Component } from "@angular/core";
import { angularMaterialRenderers } from "@jsonforms/angular-material";

@Component({
  selector: "app-root",
  template: `<jsonforms
    [data]="data"
    [schema]="schema"
    [uischema]="uischema"
    [renderers]="renderers"
  ></jsonforms>`,
})
export class AppComponent {
  renderers = angularMaterialRenderers;
  uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        label: false,
        scope: "#/properties/done",
      },
      {
        type: "Control",
        scope: "#/properties/name",
      },
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/due_date",
          },
          {
            type: "Control",
            scope: "#/properties/recurrence",
          },
        ],
      },
    ],
  };
  schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
      },
      done: {
        type: "boolean",
      },
      due_date: {
        type: "string",
        format: "date",
      },
      recurrence: {
        type: "string",
        enum: ["Never", "Daily", "Weekly", "Monthly"],
      },
    },
    required: ["name", "due_date"],
  };
  data = {};
}
```

Example module file:

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JsonFormsModule } from "@jsonforms/angular";
import { JsonFormsAngularMaterialModule } from "@jsonforms/angular-material";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
  ],
  schemas: [],
  bootstrap: [AppComponent],
})

```

## License

The JSON Forms project is licensed under the MIT License. See the [LICENSE file](https://github.com/eclipsesource/jsonforms/blob/master/LICENSE) for more information.

## Roadmap

Our current roadmap is available [here](https://github.com/eclipsesource/jsonforms/blob/master/ROADMAP.md).

## Development

JSON Forms is developed by [EclipseSource](https://eclipsesource.com).
We are always very happy to have contributions, whether for trivial cleanups or big new features.

## Migration

If you are still using JSON Forms 1, check our [migration guide](https://github.com/eclipsesource/jsonforms/blob/master/MIGRATION.md).

## Feedback, Help and Support

Feel free to start a discussion by [opening an issue](https://github.com/eclipsesource/jsonforms/issues/new/choose) on the repo
or by contacting us [directly via email](mailto:jsonforms@eclipsesource.com?subject=JSON%20Forms).
You can also use the [public chat](https://spectrum.chat/jsonforms) to get help from the community.
In addition, EclipseSource also offers [professional support](https://jsonforms.io/support) for JSON Forms.
