import axios from "axios";
import "View/css/notice.css";
import * as Io from "react-icons/io5";
import { useRecoilState } from "recoil";
import "react-quill/dist/quill.core.css";
import 'react-quill/dist/quill.snow.css';
import { useMutation } from "react-query";
import ReactQuill, { Quill } from "react-quill";
import { modalStatus } from "View/Common/utils";
import React, { useMemo, useRef, useState } from "react";
import { imageSizeChange, openNotification } from "View/utils";

const formData = new FormData();

const SaveNotice = () => {
    const quillRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalStat, setModalStat] = useRecoilState(modalStatus);

    const saveNotice = async (req) => {
        const response = await axios.post(`${process.env.REACT_APP_API}/serviceCenter/saveNotice`, req)
        return response
    }

    const mutation = useMutation({
        mutationFn: (req) => saveNotice(req),
        onSuccess: () => {
            formData.delete('others');
            openNotification(`성공적으로 저장됐습니다`, <Io.IoCheckmark />, `success`);
            setModalStat(undefined);
        },
        onError: () => {
            openNotification("저장에 실패했습니다", <Io.IoCloseOutline />, `none`);
            setModalStat(undefined);
        }
    })

    const onSubmitHandler = () => {
        const request = { announcement_title: title, announcement_content: content, announcement_type: "hompage" };
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
            if (input.files[0].size >= 3 * 1024 * 1024) {
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

    return (
        <div className="content-inside notice" style={{width: "100%"}}>
            <div className="write_wrap">
                <label className="announcement_label">
                    Title
                </label>
                <input onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="write_wrap">
                <label className="announcement_label">
                    Writer
                </label>
                <input />
            </div>
            <div className="write_wrap">
                <label className="announcement_label">
                    Content
                </label>
                <div/>
            </div>
            <ReactQuill className="text_editor" ref={quillRef} onChange={e => setContent(e)} modules={modules} />
            <div className="write_btn">
                <button className="submitBtn" style={{ cursor: "pointer" }} onClick={onSubmitHandler}>Submit</button>
            </div>
        </div>
    );
}

export default SaveNotice;