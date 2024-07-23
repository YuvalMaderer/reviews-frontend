function AddBusinessForm() {
  return (
    <div className="flex flex-col">
      <input type="text" placeholder="name" />
      <input type="text" placeholder="category" />
      <input type="text" placeholder="description" />
      <input type="file" placeholder="name" />
      <button>Submit</button>
    </div>
  );
}

export default AddBusinessForm;
