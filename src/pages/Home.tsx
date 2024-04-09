import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

const Home = () => {

    interface User {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
    }

    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState<number>(1)
    const [filterData, setFilterData] = useState<User[]>([])
    const [totalPage, setTotalPage] = useState<number>(0)
    const [userForm, setUserForm] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [user, setUser] = useState<User>({
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        avatar: ''
    })

    const userFormRef = useRef(null)

    useClickAway(userFormRef, () => {
        setUserForm(false)
    })

    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
            setUsers(res.data.data)
            setTotalPage(res.data.total_pages)
        }).catch((err) => {
            console.log(err);
        })
    }, [page])



    useEffect(() => {
        const filterData = () => {
            let filteredData = users.filter((item) => {
                if (
                    searchQuery &&
                    !item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.last_name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    return false;
                }
                return true;
            });

            return filteredData;

        };
        const filteredData = filterData();
        setFilterData(filteredData);
    }, [searchQuery]);

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage((prev) => prev + 1)
        }
    }
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    const handleEditUser = (userId: number): void => {
        const user = users.find((user) => user.id === userId)
        if (user) {
            setUser(user)
        }
        setUserForm(true)
    }

    const handleSaveUser = (e: FormEvent, userId: number) => {
        e.preventDefault()
        const newUsers = users.map((item) => {
            if (item.id === userId) {
                item = user
            }
            return item
        })
        setUsers(newUsers)
        setUserForm(false)
    }

    const handleDeleteUser = (userId: number) => {
        const newUsers = users.filter((user) => user.id !== userId)
        setUsers(newUsers)
    }


    return (
        <div className={` w-full min-h-screen bg-gray-300 flex flex-col justify-center items-center`}>
            <div className=" w-2/3 my-4  flex justify-between  "><input onChange={(e) => setSearchQuery(e.target.value)} className=" w-2/3 h-10 focus:outline-none rounded-sm px-2" type="text" placeholder="Search user.." /> <div>
                <span className=" hidden sm:block font-bold mr-3">Sorted by </span> <select className=" h-10 focus:outline-none  rounded-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div></div>
            <div className={`${userForm && "blur-sm"} w-2/3 min-h-[80vh] bg-white container  rounded-lg p-3 mb-10`}>
                <div className=" min-h-[70vh] ml-2">
                    {searchQuery ? filterData?.sort((a, b): any => {
                        const nameA = a.first_name.toLowerCase()
                        const nameB = b.first_name.toLowerCase()
                        if (sortOrder === 'asc') {
                            return nameA.localeCompare(nameB)
                        } else {
                            return nameB.localeCompare(nameA)
                        }
                    }).map((user) => {
                        return (<div key={user.id} className=" flex gap-2 items-center flex-wrap sm:flex-nowrap ">
                            <div className=" w-10 p-3 rounded-full h-10 bg-cover" style={{ backgroundImage: `url(${user.avatar})` }} />
                            <div className=" w-1/4 p-3 flex  items-center text-sm">{user.first_name} {user.last_name} {user.email}</div>
                            <div className=" w-1/4 p-4 flex  items-center"></div>
                            <div className=" w-1/4 p-4 flex  items-center"><button onClick={() => handleEditUser(user.id)} className=" bg-yellow-300 rounded-md flex py-1 px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                                Edit</button></div>
                            <div className=" w-1/4 p-4 flex  items-center"><button onClick={() => handleDeleteUser(user.id)} className=" bg-red-500 text-white py-1 px-2 rounded-md">Delete</button></div>
                        </div>)
                    }) :
                        users.sort((a, b): any => {
                            const nameA = a.first_name.toLowerCase()
                            const nameB = b.first_name.toLowerCase()
                            if (sortOrder === 'asc') {
                                return nameA.localeCompare(nameB)
                            } else {
                                return nameB.localeCompare(nameA)
                            }
                        }).map((user) => {
                            return (<div key={user.id} className=" flex gap-2 items-center flex-wrap sm:flex-nowrap ">
                                <div className=" w-10 p-3 rounded-full h-10 bg-cover" style={{ backgroundImage: `url(${user.avatar})` }} />
                                <div className=" w-1/4 p-3 flex  items-center text-sm">{user.first_name} {user.last_name} {user.email}</div>
                                <div className=" w-1/4 p-4 flex  items-center"></div>
                                <div className=" w-1/4 p-4 flex  items-center"><button onClick={() => handleEditUser(user.id)} className=" bg-yellow-300 rounded-md flex py-1 px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                    Edit</button></div>
                                <div className=" w-1/4 p-4 flex  items-center"><button onClick={() => handleDeleteUser(user.id)} className=" bg-red-500 text-white py-1 px-2 rounded-md">Delete</button></div>
                            </div>)
                        })}
                </div>
                <div className={` ${users.length ? "block" : "hidden"} mt-5  w-full flex justify-between`}>
                    <button disabled={page === 1 ? true : false} onClick={handlePrevPage} className={` py-1 px-2 bg-black rounded-sm text-white ${page === 1 && "bg-gray-200"}`}>Prev</button>
                    <button disabled={page === totalPage ? true : false} onClick={handleNextPage} className={` py-1 px-2 bg-black rounded-sm text-white ${page === totalPage && "bg-gray-200"}`}>Next</button>
                </div>
            </div>
            {userForm && <div ref={userFormRef} className="absolute">
                <form onSubmit={(e) => handleSaveUser(e, user.id)} className=" flex flex-col w-full  bg-green-200 border border-black p-10 space-y-10 rounded-md ">
                    <div className=" w-full flex justify-between space-x-4"><label htmlFor="firstname">First Name :</label>
                        <input className=" px-2 py-1 focus:outline-none" onChange={(e) => setUser({ ...user, first_name: e.target.value })} type="text" name="firstname" value={user?.first_name} /></div>
                    <div className=" w-full flex justify-between space-x-4"> <label htmlFor="lastname">Last Name :</label>
                        <input className=" px-2 py-1 focus:outline-none" onChange={(e) => setUser({ ...user, last_name: e.target.value })} type="text" name="lastname" value={user?.last_name} /></div>
                    <div className=" w-full flex justify-between space-x-4">  <label htmlFor="email">Email :</label>
                        <input className=" px-2 py-1 focus:outline-none" onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" name="email" value={user?.email} /></div>
                    <button className=" bg-blue-500 py-1 px-2 rounded-md">Save</button>
                </form>
            </div>}
        </div>
    )
}

export default Home