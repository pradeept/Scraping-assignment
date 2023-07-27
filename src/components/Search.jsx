import { BsSearch } from "react-icons/bs";
import { handleCustomSearch, getText } from "../services/handleCustomSearch";
import { useState } from "react";
import Modal from "./Modal";

export default function Search() {
    const [query, setQuery] = useState("");

    const [topUrls,setTopUrls] =  useState([])

    const [scrapedText, setScraptedText] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //To show Loading modal
        setShowLoading(true);

        //Get the 5 urls
        const urls = await handleCustomSearch(query);
        //set state for future use
        setTopUrls(urls);

        //call getText to get the text content of respective urls
        const scrapedText = await getText(urls);

        //Resolve all the 5 returned promises
        Promise.all(scrapedText).then((res) => {
            setScraptedText(res);
            setShowLoading(false);
        });
    };

    return (
        <>
            <div className='container mx-auto font-worksans'>
                <div className='flex flex-col items-center border-2 rounded-lg py-4 my-28 mx-8 md:mx-36 focus-within:border-blue-100 focus-within:shadow-md'>
                    <form
                        className='flex gap-4 flex-wrap justify-around'
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <input
                                type='text'
                                placeholder='Search...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className='border-b-2 border-b-gray-200 focus:outline-none focus:border-b-blue-300 font-semibold '
                            />
                        </div>
                        <div className='flex focus-within:cursor-pointer items-center gap-2 bg-blue-400 text-white px-2 py-1 rounded-lg  hover:bg-blue-500 border-2 border-b-blue-100 '>
                            <input
                                type='submit'
                                value='Search'
                                className='cursor-pointer focus:outline-none'
                            />
                            <BsSearch />
                        </div>
                    </form>
                </div>
                <div className='flex flex-wrap flex-col px-10 md:px-48 text-slate-500'>
                    <p className='text-slate-700 text-left text-2xl'>Content</p>

                    {/* To show scraped text */}
                    {scrapedText.map((item,index) => {
                        return <div className="flex gap-2 flex-col flex-wrap px-8 py-2 mt-6 hover:shadow " key={index}>
                            <h3 className="font-bold">{topUrls[index].link}</h3>
                            <p className='flex flex-wrap'>{item.text}</p>;
                        </div>
                    })}
                </div>

                {/* Loading Modal */}
                {showLoading && (
                    <Modal>
                        <h1 className='text-xl text-center md:text-3xl'>
                            Scraping your content...
                        </h1>
                        <img
                            src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
                            alt='loading gif'
                            height="150px"
                            width="150px"
                        />
                    </Modal>
                )}
            </div>
        </>
    );
}
