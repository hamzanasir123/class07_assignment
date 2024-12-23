import Image from "next/image";
import React from "react";

interface CSR {
  id: number;
  name: string;
  type: string;
  available: string;
}

const Page = async () => {
  const response = await fetch("https://simple-books-api.glitch.me/books/", {
    next: { revalidate: 60 },
  });
  const apiData: CSR[] = await response.json();

  return (
    <>
    <div className='flex justify-center items-center my-6 text-2xl font-bold'>
            <p>Data Fetched Succesfully</p>
    </div>
      <div className="flex flex-wrap p-6 sm:p-10 gap-8 sm:gap-16 justify-center">
        {apiData.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[324px] rounded border-2 border-white"
          >
            <Image
              src={
                "https://i.guim.co.uk/img/media/423d3ddf306e98864c1d887c1dcf290421cd21a7/0_169_4912_6140/master/4912.jpg?width=445&dpr=1&s=none&crop=none"
              }
              alt={"Book"}
              height={349}
              width={423}
              className="w-[350px] h-[350px] object-cover"
            />
            <div className="p-4 text-left">
              <p className="text-[#FF9F0D]"><span className="text-white">Book Type : </span>{item.type}</p>
              <p className="font-bold text-sm sm:text-base"><span className="text-white">Book Name : </span>{item.name}</p>
              <p
                className={`text-sm sm:text-base ${
                  item.available ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
