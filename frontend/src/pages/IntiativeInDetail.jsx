import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../contexts/ShopContext';
import { jwtDecode } from 'jwt-decode';



function InitiativeInDetail() {
    const location = useLocation();
    const { id } = useParams();
    const { backendUrl } = useContext(ShopContext);
    const [joins, setjoins] = useState(0);
    const [loading, setLoading] = useState(0);

    // setting initiative
    const [initiative, setInitiative] = useState(location.state);

    // members array to check joined or not
    const [members, setMembers] = useState([]);


    // extracting token from localstorage
    const token = localStorage.getItem("token");

    useEffect(() => { setInitiative(location.state) }, [location.state])

    if (!initiative) {
        return (
            <div className="text-center text-red-600 p-6">
                No initiative data found.
            </div>
        );
    }

    // Share handler
    const handleShare = async () => {
        const url = window.location.href;
        const title = initiative?.title || 'Check this out!';
        const text = 'Have a look at this Initiative I found:';

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch {
                try {
                    await navigator.clipboard.writeText(url);
                    toast.info('Link copied to clipboard!');
                } catch {
                    toast.error('Failed to share link');
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
            } catch {
                toast.error('Failed to copy link');
            }
        }
    };

    //  Fetch joins & isLiked
    const fetchJoins = () => {
        axios
            .get(`${backendUrl}/api/initiative/${id}`, { headers: { token } })
            .then((res) => {
                setjoins(res.data.joins);
                setMembers(res.data.joinArray);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }

            });
    };


    // fetch joins on first mount
    useEffect(() => { fetchJoins(), [] })


    // join/leave action
    const InitiativeAction = async (initiativeId, action) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/initiative/memberaction`,
                { initiativeId, action },
                { headers: { token } }
            );
            console.log(!members.includes(jwtDecode(token).id));
            fetchJoins();
            console.log(`Initiative ${action} successfully!`);
            // setRefresh(!refresh);
            setLoading(0);
            // console.log(initiative)
        } catch (error) {
            console.error("Error processing initiative action:", error);
            setRefresh(!refresh);
        }

    };



    return (
        <div className="eco-static-bg">
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-green-50 shadow-lg rounded-lg overflow-hidden">
                    {/* Image */}
                    {initiative.imgUrl && (
                        <img
                            src={initiative.imgUrl}
                            alt={initiative.title}
                            className="w-full h-64 object-cover"
                        />
                    )}

                    <div className="p-6">
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-green-800 mb-2">
                            {initiative.title}
                        </h1>

                        {/* Leader*/}
                        <div className="flex justify-between text-sm text-green-900 mb-4">
                            <span>
                                <b>LEAD {(initiative.leader?.name).toUpperCase() || "Unknown"} </b>

                            </span>

                            <span>
                                {new Date(initiative.createdAt).toLocaleDateString()}
                            </span>
                        </div>



                        <div className='flex gap-4 my-2 hover:cursor-pointer'>
                            {/* share button */}
                            <button onClick={handleShare}>
                                <span className='flex gap-1 text-bold hover:cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill='#0d542b' viewBox="0 0 640 640"><path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" /></svg>
                                </span>
                            </button>


                            {/* conditinal rending of join button */}
                            {members.includes(jwtDecode(token).id) ? (
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setLoading(true);
                                        InitiativeAction(initiative._id, "leave");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 "
                                >
                                    {loading ? (
                                        // spinner
                                        <svg
                                            className="animate-spin h-6 w-6 text-green-900"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="29"
                                                height="29"
                                                fill="#0d542b"
                                                viewBox="0 0 640 640"
                                            >
                                                <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                            </svg>
                                            <span className="text-green-900 text-xl">Joined ({joins})</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setLoading(true);
                                        InitiativeAction(initiative._id, "join");
                                    }}
                                    className="flex items-center gap-2 px-4 py-2  hover:bg-green-50 disabled:opacity-60"
                                >
                                    {loading ? (
                                        // spinner
                                        <svg
                                            className="animate-spin h-6 w-6 text-green-900"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="29"
                                                height="29"
                                                fill="#0d542b"
                                                viewBox="0 0 640 640"
                                            >
                                                <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                                            </svg>
                                            <span className="text-green-900 text-xl">Join ({joins})</span>
                                        </>
                                    )}
                                </button>
                            )}


                        </div>


                        {/* Description */}
                        <p className="text-green-900 text-base mb-4 whitespace-pre-wrap leading-relaxed">
                            {initiative.description}
                        </p>

                        {/* Location */}
                        {initiative.location && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-green-800">Location</h2>
                                <iframe
                                    title="map"
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                                        initiative.location
                                    )}&output=embed`}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-lg mt-2"
                                ></iframe>
                            </div>
                        )}


                        {/* contact leader */}
                        <div className='mt-6'>
                            <span className="text-lg font-semibold text-green-900 ">Contact Us</span>

                            <span className='flex gap-3'>
                                <span className='text-green-900'>
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${initiative.leader.email}&su=${encodeURIComponent(
                                            "Joining Initiative"
                                        )}&body=${encodeURIComponent(
                                            "Hi, I would like to join your initiative."
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#0d542b' width="30" height="30" viewBox="0 0 640 640"><path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" /></svg>
                                    </a>
                                </span>

                                <span>
                                    <a
                                        href={`https://wa.me/91${initiative.leader.phone}?text=Hi%20${initiative.leader.name}%20I%20want%20to%20join%20your%20initiative%20${initiative.title}!`}
                                        target="_blank"
                                        rel="noopener noreferrer"

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            troke-width="3"
                                            width="30" height="30" fill='#0d542b' viewBox="0 0 640 640"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" /></svg>
                                    </a>


                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InitiativeInDetail;
