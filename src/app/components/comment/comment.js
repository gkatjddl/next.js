'use client'
import { useEffect, useState } from 'react'
// 리액트 방식으로 새로고침없이 state와 ajax요청(fetch)
import './comment.css'

// 컴포넌트는 대문자로 시작
export default function Conmment(){

    const[comment,setComment] = useState('');       // input창에 입력한 내용 담기
    const[commentList, setCommentList] = useState([])       // 보여줄 댓글들

    // 페이지가 로딩될때 commentList의 내용을 요청한다
    // useEffect : 로딩될때, 언로딩될때, 갱신될때
    useEffect(()=>{
        // 서버에 댓글리스틀 GET요청 해서 받아온다
        // 받아온 응답을 setCommentList에 담는다
        fetch('/api/commnet/list?id=' + boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result);
        })
    }, [])

    return(
        <div className="comment-container">
            <hr/>
            {
                commentList.length > 0 ? (
                    commentList.map((item, index)=>{
                        return(
                            <p key={index}>{item?.content}</p>
                        )
                    })
                ):(
                    null
                )
            }
            {/* onChange : 무언가 입력될 때마다 발동되는 함수*/}
            <input onChange={(e)=>{e.target.value}} id='comment-input'/>
            {/* 버튼이 클릭되면 /api/comment/new에 저장해달라고 요청 보내기*/}
            <button onClick={()=>{
                document.getElementById('comment-input').value = '';
                
                fetch('/api/comment-input',{method:"POST",})
            }}>댓글 입력</button>
        </div>
    )
}