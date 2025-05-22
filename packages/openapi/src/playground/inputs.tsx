'use client';
import {
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  useState,
} from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Controller,
  useController,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/select';
import type { RequestSchema } from '@/playground/index';
import { Input, labelVariants } from '@/ui/components/input';
import { getDefaultValue } from './get-default-values';
import { cn } from 'nopends-ui/utils/cn';
import { buttonVariants } from 'nopends-ui/components/ui/button';
import { combineSchema } from '@/utils/combine-schema';
import { schemaToString } from '@/utils/schema-to-string';
import {
  anyFields,
  useFieldInfo,
  useResolvedSchema,
} from '@/playground/schema';

interface InputHeaderProps {
  name?: ReactNode;
  required?: boolean;
  type?: string;
}

function FieldHeader({
  name,
  required = false,
  type,
  ...props
}: InputHeaderProps & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={cn('w-full inline-flex items-center gap-1', props.className)}
    >
      <span className={cn(labelVariants())}>
        {name}
        {required ? <span className="text-red-400/80 mx-1">*</span> : null}
      </span>

      <div className="flex-1" />
      {type ? (
        <code data-type={true} className="text-xs text-fd-muted-foreground">
          {type}
        </code>
      ) : null}
      {props.children}
    </label>
  );
}

export function ObjectInput({
  field: _field,
  fieldName,
  ...props
}: {
  field: Exclude<RequestSchema, boolean>;
  fieldName: string;
} & HTMLAttributes<HTMLDivElement>) {
  const field = useResolvedSchema(
    combineSchema([_field, ...(_field.allOf ?? []), ...(_field.anyOf ?? [])]),
  );

  return (
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      {Object.entries(field.properties ?? {}).map(([key, child]) => (
        <FieldSet
          key={key}
          name={key}
          field={child}
          fieldName={`${fieldName}.${key}`}
          isRequired={field.required?.includes(key)}
        />
      ))}
      {(field.additionalProperties || field.patternProperties) && (
        <DynamicProperties
          fieldName={fieldName}
          filterKey={(v) =>
            !field.properties || !Object.keys(field.properties).includes(v)
          }
          getType={(key) => {
            for (const pattern in field.patternProperties) {
              if (key.match(RegExp(pattern))) {
                return field.patternProperties[pattern];
              }
            }

            if (field.additionalProperties) return field.additionalProperties;

            return anyFields;
          }}
        />
      )}
    </div>
  );
}

export function JsonInput({
  fieldName,
  children,
}: {
  fieldName: string;
  children: ReactNode;
}) {
  const controller = useController({
    name: fieldName,
  });
  const [value, setValue] = useState(() =>
    JSON.stringify(controller.field.value, null, 2),
  );

  return (
    <div className="rounded-lg border bg-fd-secondary text-fd-secondary-foreground">
      {children}
      <textarea
        {...controller.field}
        value={value}
        className="p-2 w-full h-[240px] text-[13px] font-mono resize-none focus-visible:outline-none"
        onChange={(v) => {
          setValue(v.target.value);
          try {
            controller.field.onChange(JSON.parse(v.target.value));
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
}

function DynamicProperties({
  fieldName,
  filterKey = () => true,
  getType = () => anyFields,
}: {
  fieldName: string;
  filterKey?: (key: string) => boolean;
  getType: (key: string) => RequestSchema;
}) {
  const { control, setValue, getValues } = useFormContext();
  const [nextName, setNextName] = useState('');
  const [properties, setProperties] = useState<string[]>(() => {
    const value = getValues(fieldName);
    if (value) return Object.keys(value).filter(filterKey);

    return [];
  });

  const onAppend = () => {
    const name = nextName.trim();
    if (name.length === 0) return;

    setProperties((p) => {
      if (p.includes(name) || !filterKey(name)) return p;
      const type = getType(name);

      setValue(`${fieldName}.${name}`, getDefaultValue(type));
      setNextName('');
      return [...p, name];
    });
  };

  return (
    <>
      {properties.map((item) => (
        <FieldSet
          key={item}
          name={item}
          field={getType(item)}
          fieldName={`${fieldName}.${item}`}
          toolbar={
            <button
              type="button"
              aria-label="Remove Item"
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  className: 'p-1',
                }),
              )}
              onClick={() => {
                setProperties((p) => p.filter((prop) => prop !== item));
                control.unregister(`${fieldName}.${item}`);
              }}
            >
              <Trash2 className="size-4" />
            </button>
          }
        />
      ))}
      <div className="flex gap-2">
        <Input
          value={nextName}
          placeholder="Enter Property Name"
          onChange={(e) => setNextName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAppend();
              e.preventDefault();
            }
          }}
        />
        <button
          type="button"
          className={cn(
            buttonVariants({ color: 'secondary', size: 'sm' }),
            'px-4',
          )}
          onClick={onAppend}
        >
          New
        </button>
      </div>
    </>
  );
}

export function FieldInput({
  field,
  fieldName,
  isRequired,
  ...props
}: HTMLAttributes<HTMLElement> & {
  field: Exclude<RequestSchema, boolean>;
  isRequired?: boolean;
  fieldName: string;
}) {
  const { control, register } = useFormContext();

  if (field.type === 'object') {
    return (
      <ObjectInput
        field={field}
        fieldName={fieldName}
        {...props}
        className={cn(
          'rounded-lg border border-fd-primary/20 bg-fd-background/50 p-3 shadow-sm',
          props.className,
        )}
      />
    );
  }

  if (field.type === 'array') {
    return (
      <ArrayInput
        fieldName={fieldName}
        items={field.items ?? anyFields}
        {...props}
        className={cn(
          'rounded-lg border border-fd-primary/20 bg-fd-background/50 p-3 shadow-sm',
          props.className,
        )}
      />
    );
  }

  if (field.type === 'string' && field.format === 'binary') {
    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { value: _, onChange, ...restField } }) => (
          <input
            id={fieldName}
            type="file"
            multiple={false}
            onChange={(e) => {
              if (!e.target.files) return;
              onChange(e.target.files.item(0));
            }}
            {...props}
            className={cn(
              'border rounded-lg bg-fd-background text-fd-muted-foreground p-2 font-medium text-sm',
              props.className,
            )}
            {...restField}
          />
        )}
      />
    );
  }

  if (field.type === 'boolean') {
    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { value, onChange, ...restField } }) => (
          <Select
            value={String(value)}
            onValueChange={(value) =>
              onChange(value === 'null' ? null : value === 'true')
            }
            disabled={restField.disabled}
          >
            <SelectTrigger
              id={fieldName}
              className={props.className}
              {...restField}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
              {!isRequired && <SelectItem value="null">Null</SelectItem>}
            </SelectContent>
          </Select>
        )}
      />
    );
  }

  return (
    <Input
      id={fieldName}
      placeholder="Enter value"
      type={field.type === 'string' ? 'text' : 'number'}
      {...register(fieldName, {
        valueAsNumber: field.type === 'number' || field.type === 'integer',
      })}
      {...props}
    />
  );
}

export function FieldSet({
  field: _field,
  fieldName,
  toolbar,
  name,
  isRequired,
  depth = 0,
  ...props
}: HTMLAttributes<HTMLElement> & {
  isRequired?: boolean;
  name?: ReactNode;
  field: RequestSchema;
  fieldName: string;
  depth?: number;
  toolbar?: ReactNode;
}) {
  const field = useResolvedSchema(_field);
  const [show, setShow] = useState(
    () =>
      typeof _field !== 'object' ||
      !_field.$ref ||
      (field.type !== 'object' && !field.allOf && !field.oneOf && !field.anyOf),
  );
  const { info, updateInfo } = useFieldInfo(fieldName, field, depth);

  if (_field === false) return null;
  if (!show) {
    return (
      <FieldHeader {...props} name={name} required={isRequired}>
        {toolbar}
        <button
          type="button"
          className={cn(buttonVariants({ size: 'sm' }))}
          onClick={() => setShow(true)}
        >
          Show
        </button>
      </FieldHeader>
    );
  }

  if (field.oneOf) {
    return (
      <FieldSet
        {...props}
        className={cn(props.className, '[&>label>[data-type]]:hidden')}
        name={name}
        fieldName={fieldName}
        isRequired={isRequired}
        field={field.oneOf[info.oneOf]}
        depth={depth + 1}
        toolbar={
          <>
            <select
              className="text-xs font-mono"
              value={info.oneOf}
              onChange={(e) => {
                updateInfo({
                  oneOf: Number(e.target.value),
                });
              }}
            >
              {field.oneOf.map((item, i) => (
                <option key={i} value={i}>
                  {schemaToString(item)}
                </option>
              ))}
            </select>
            {toolbar}
          </>
        }
      />
    );
  }

  if (Array.isArray(field.type)) {
    return (
      <fieldset
        {...props}
        className={cn('flex flex-col gap-1.5', props.className)}
      >
        <FieldHeader name={name} htmlFor={fieldName} required={isRequired}>
          <select
            className="text-xs font-mono"
            value={info.selectedType}
            onChange={(e) => {
              updateInfo({
                selectedType: e.target.value,
              });
            }}
          >
            {field.type.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {toolbar}
        </FieldHeader>
        <p className="text-xs text-fd-muted-foreground">{field.description}</p>
        <FieldInput
          isRequired={isRequired}
          field={{
            ...field,
            type: info.selectedType,
          }}
          fieldName={fieldName}
        />
      </fieldset>
    );
  }

  return (
    <fieldset
      {...props}
      className={cn('flex flex-col gap-1.5', props.className)}
    >
      <FieldHeader
        htmlFor={fieldName}
        name={name}
        required={isRequired}
        type={field.oneOf ? undefined : schemaToString(field)}
      >
        {toolbar}
      </FieldHeader>
      {show ? (
        <FieldInput
          field={field}
          fieldName={fieldName}
          isRequired={isRequired}
        />
      ) : (
        <div>
          <button onClick={() => setShow((prev) => !prev)}>Show</button>
        </div>
      )}
    </fieldset>
  );
}

function ArrayInput({
  fieldName,
  items,
  ...props
}: {
  fieldName: string;
  items: RequestSchema;
} & HTMLAttributes<HTMLDivElement>) {
  const name = fieldName.split('.').at(-1) ?? '';
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  return (
    <div {...props} className={cn('flex flex-col gap-2', props.className)}>
      {fields.map((item, index) => (
        <FieldSet
          key={item.id}
          name={
            <span className="text-fd-muted-foreground">
              {name}[{index}]
            </span>
          }
          field={items}
          fieldName={`${fieldName}.${index}`}
          toolbar={
            <button
              type="button"
              aria-label="Remove Item"
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  className: 'p-1',
                }),
              )}
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </button>
          }
        />
      ))}
      <button
        type="button"
        className={cn(
          buttonVariants({
            color: 'outline',
            className: 'gap-1.5 py-2',
            size: 'sm',
          }),
        )}
        onClick={() => {
          append(getDefaultValue(items));
        }}
      >
        <Plus className="size-4" />
        New Item
      </button>
    </div>
  );
}
