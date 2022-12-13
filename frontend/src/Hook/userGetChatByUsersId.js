export default function useGetChatByUsersId() {
    return function (userId1, userId2) {
        return fetch(`http://localhost:8245/chatByUsersId/${userId1}&${userId2}`, {
            method: 'GET',
            mode: "cors"
        })
        .then(data => data.json())
    }
}