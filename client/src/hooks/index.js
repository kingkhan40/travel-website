import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBlog = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        
        const fetchUsername = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/blog/uname`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                localStorage.setItem("Username", response.data.uname);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
        fetchUsername();
    }, [id]);

    return { loading, blog };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlogs(response.data.posts);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUsername = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/blog/uname`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                localStorage.setItem("Username", response.data.uname);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
        fetchUsername();
    }, []);

    return { loading, blogs };
};
