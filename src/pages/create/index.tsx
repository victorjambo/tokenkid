import Dropzone from "react-dropzone";
import PageHeader from "@/containers/pageHeader";

const Create: React.FC = () => {
  return (
    <>
      <PageHeader title="Create" />
      <div className="bg-white-back w-full pt-24 pb-96">
        <div className="flex flex-col container m-auto">
          <div className="text-3xl pb-4">Create Collectible Item</div>
          <div className="flex flex-col bg-white py-10 px-5 rounded-lg space-y-6">
            <div className="flex flex-col">
              <label>Upload File</label>
              <Dropzone maxFiles={1} onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="w-full border-dashed border-2 h-32 rounded flex justify-center items-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <span className="block text-gray-400">
                      Drag 'n' drop file here, or click to select files
                    </span>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="flex flex-col">
              <label>Choose Item Category</label>
              <input
                className="px-4 py-2 border rounded-md"
                placeholder="Choose Item Category"
              />
            </div>
            <div className="flex flex-col">
              <label>Item Name</label>
              <input
                className="px-4 py-2 border rounded-md"
                placeholder="Item Name"
              />
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <input
                className="px-4 py-2 border rounded-md"
                placeholder="Description"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
