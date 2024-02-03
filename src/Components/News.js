import React, {  useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const[articles,setArticles] = useState([])
  const[loading,setLoading] = useState(true)
  const[page,setPage] = useState(1)
  const[totalResults,setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (element) => {
    return element.charAt(0).toUpperCase() + element.slice(1)
  }

  const updateNews = async() => {
    props.setProgress(10) // setting progress bar at length 10 first
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  // async componentDidMount() {  // useEffect plays role of componentDidMount in function component
  //   this.updateNews()
  // }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  },[])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    const response = await fetch(url);
    const parsedData = await response.json();

    setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]); // we are concating more articles to current articles
    setTotalResults(parsedData.totalResults);
  };

    return (
      <>
        <h1 className="text-center mb-4" style={{marginTop:"70px"}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        {/*will show loading when page is loading */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}>

          <div className="container">
            <div className="row">
              {
                articles.map((element) => {
                  return (
                    <div className="col-md-4 my-3" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={element.description ? element.description : ""}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })
              }

            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

 News.defaultProps = {
  country: 'in',
  pageSize: 15,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;