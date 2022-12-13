export default function useBackendMessage() {
    return function (userId, message) {
        return fetch(`http://localhost:8245/message/${userId}`, {
            method: 'POST',
            body: JSON.stringify(message)
        })
            .then(data => data.json())
            .then(data => data.message)
    }
}