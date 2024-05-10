import axios from "axios";
import "View/css/notice.css";
import * as Io from "react-icons/io5";
import { useRecoilState } from "recoil";
import "react-quill/dist/quill.core.css";
import 'react-quill/dist/quill.snow.css';
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { modalStatus } from "View/Common/utils";
import ReactQuill, { Quill } from "react-quill";
import { useState, useEffect, useMemo, useRef } from "react";
import { imageSizeChange, localDatetimeRenderer, openNotification } from "View/utils";

const formData = new FormData();

const NoticeContents = ({ element }) => {
    const quillRef = useRef(null);
    const location = useLocation();
    const [date, setDate] = useState(undefined);
    const [title, setTitle] = useState(element.announcement_title);
    const [content, setContent] = useState(element.announcement_content);
    const [currentData, setCurrentData] = useState(undefined);
    const [modalStat, setModalStat] = useRecoilState(modalStatus)

    const changeNotice = async (req) => {
        const response = await axios.post(`${process.env.REACT_APP_API}/serviceCenter/changeNotice/${currentData.id}`, req)
        return response
    }

    const mutation = useMutation({
        mutationFn: (req) => changeNotice(req),
        onSuccess: () => {
            formData.delete('others');
            openNotification(`성공적으로 수정됐습니다`, <Io.IoCheckmark />, `success`);
            setModalStat(undefined);
        },
        onError: () => {
            openNotification("수정에 실패했습니다", <Io.IoCloseOutline />, `none`);
            setModalStat(undefined);
        }
    })

    const onSubmit = () => {
        const request = { announcement_title: title, announcement_content: content, created_date: date };
        formData.set('others', JSON.stringify(request));
        mutation.mutate(formData);
    }

    const imageHandler = () => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            if (input.files[0].size >= 10 * 1024 * 1024) {
                alert("이미지 크기가 너무 큽니다");
            } else {
                const imageURL = URL.createObjectURL(input.files[0]);
                try {
                    let image = new Image();
                    image.src = imageURL;
                    image.onload = () => {
                        const resizedImage = imageSizeChange(image, 'quill', input.files[0].type);
                        const range = editor.getSelection()?.index;
                        if (range !== null && range !== undefined) {
                            const quillImage = Quill.import('formats/image');
                            editor?.setSelection(range, 1);
                            quillImage.sanitize = resizedImage => resizedImage;
                            editor.insertEmbed(range.index, 'image', resizedImage);
                        }
                    };
                } catch (error) {
                    alert("Error");
                }
            }
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ size: ['small', 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image', 'video'],
                    [{ align: '' }, { align: 'center' }, { align: 'right' }]
                ],
                handlers: {
                    image: imageHandler
                }
            }
        }),
        []
    );

    useEffect(() => {
        if (currentData === undefined) {
            if (location.state?.item) {
                setCurrentData(location.state?.item);
                setTitle(location.state?.item.announcement_title);
                setContent(location.state?.item.announcement_content)
                setDate(localDatetimeRenderer(location.state?.item?.created_date, "dateBar"));
            } else {
                setCurrentData({ announcement_title: "No data", announcement_content: "No data" })
            }
        }
    }, [])

    return (
        <div className="content-inside notice">
            <div className="write_wrap">
                <label className="announcement_label">
                    Title
                </label>
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="write_wrap">
                <label className="announcement_label">
                    Writer
                </label>
                ADMIN
            </div>
            <div className="write_wrap">
                <label className="announcement_label">
                    Created date
                </label>
                {localDatetimeRenderer(currentData?.created_date, "dateFormat")}
            </div>
            <ReactQuill
                theme="snow"
                ref={quillRef}
                value={content}
                modules={modules}
                className="text_editor"
                onChange={e => setContent(e)}
            />
            <div className="write_btn">
                <button className="submitBtn" style={{ cursor: "pointer" }} onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default NoticeContents;