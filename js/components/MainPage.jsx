import { useEffect, useState } from "react";

export default function MainPage() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await fetch("/api/records", {
        method: "GET",
      });
      const data = await response.json();
      setRecords(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = (event) => {
		event.preventDefault();
		const id = event.target.id;
		try {
			fetch(`/api/records?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
						setRecords(records.filter(record => record._id !== id));
				});
		}
		catch (error) {
			console.log(error);
		}
	}

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="mx-auto text-center text-6xl">Fun facts app</h1>
				<p className="mx-auto text-center mt-4 text-3xl">This is an app that showcases fun facts</p>
				<p className="mx-auto text-center mt-4 text-3xl">You can add, delete and view fun facts</p>

				<div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
					{records.map(record => (
						<div
							key={record._id}
							className="block max-w-sm mx-auto sm:mx-0 w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{record.title}
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{record.description}
							</p>
							<div className={"flex justify-center mt-4"}>
								<button type="button"
								        id={record._id}
								        onClick={deleteRecord}
								        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete
								</button>
							</div>
						</div>
					))}
				</div>
				<p className="mx-auto text-center mt-4 text-3xl">Add a new fun fact</p>
			</div>
		</section>
  );
}
