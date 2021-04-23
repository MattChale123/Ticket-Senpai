import { useContext } from "react";
import { ReactReduxContext } from "react-redux";

export default function useStubHub(){
    const { store } = useContext(ReactReduxContext)
    const { getState } = store
    const { stubHub } = getState()
    if (stubHub && stubHub.access_token) {
        const api = new StubHubAPI(stubHub.access_token)
        return api;
    }
    return new StubHubAPI()
}

class StubHubAPI {
    constructor(accessToken) {
        this.accessToken = accessToken
    }
    sendRequest(url, queries) {
        if (!this.accessToken){
            return Promise.resolve(null)
        }
        const queryString = new URLSearchParams(queries).toString()
        return fetch(`https://api.stubhub.com${url}?${queryString}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                Accept: 'application/json'
            }
        })
        .then(res => res.json())
    }
    searchEvents(queries) {
        return this.sendRequest('/sellers/search/events/v3', queries)
    }
    searchPerformers(name) {
        return this.sendRequest('/partners/search/performers/v3', {id: '450948'})
    }
    searchMusicByCity(city){
        return this.sendRequest('/sellers/search/events/v3', {categoryName: 'concert', city, sort: 'popularity desc', parking: false})
    }
}