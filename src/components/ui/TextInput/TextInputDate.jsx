const TextInputDate = ({ field, form, ...props }) => {
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="w-full sm:w-80 md:w-96 lg:w-128">
      <input
        {...field}
        {...props}
        dir="rtl"
        className={`bg-slate-100 text-gray-950 mt-1 block py-2 px-3 w-full rounded-md border-b-4 ${
          hasError ? "border-red-500" : "border-gray-200"
        } focus:outline-none focus:border-sky-700 text-right`}
      />
      {hasError && (
        <div className="text-red-500 text-sm mt-1">{form.errors[field.name]}</div>
      )}
    </div>
  );
};

export default TextInputDate;
