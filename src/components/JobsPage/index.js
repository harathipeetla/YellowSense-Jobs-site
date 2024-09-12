import { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

import JobCard from "../JobCardPage";
import "./index.css"



class Jobs extends Component{
    state ={
        jobs:[],
        hasMore:true,
        page:1,
        loading:false,
        error:null
    }


    componentDidMount(){
        this.handleFetchJobs()
    }


    handleFetchJobs =()=>{
        const {page} = this.state 

        this.setState({loading:true})

        axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`)
        .then(response =>{
            const newJobs = response.data.results;
            console.log(newJobs)
            this.setState(prevState =>({
                jobs:[...prevState.jobs,...newJobs],
                loading:false,
                hasMore:newJobs.length > 0,
            }))
        })
        .catch(error =>{
            console.log('Error fetching jobs', error)
            this.setState({loading:false})
        })
    }


    render(){

        const {jobs, hasMore,loading, error} = this.state
        if(loading) return <ThreeDots color="#000"/>
        return(
            <div className="jobs-container">
                <h1>Jobs List</h1>
                {error && <p>{error}</p>}
                <InfiniteScroll
                   dataLength={jobs.length}
                   next={this.handleFetchJobs}
                   hasMore={false}
                   loader={<h1>Loading....</h1>}
                >
                    {jobs.map((job, index) =>(
                        <JobCard key={index} job={job}/>
                    ))}

                </InfiniteScroll>
                {!hasMore && <h3>No more jobs...</h3>}
            </div>
        )
    }
}


export default Jobs