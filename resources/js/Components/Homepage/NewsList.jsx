import React from 'react'

const getImageUrl = (imageName) => {
  return `/storage/images/${imageName}`; // Update path as needed based on storage link
};

const isNews = (news) => {
  console.log("Data berita : ", news);
  return news.map((datas, i) => {
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={getImageUrl(datas.image)}
            alt={datas.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {datas.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{datas.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-inline">{datas.category}</div>
            <div className="badge badge-outline">{datas.author}</div>
          </div>
        </div>
      </div>
    )
  })
}

const noNews = () => {
  return (
    <div className="text-center font-bold">
      <p>Belum ada berita yang ditemukan.</p>
    </div>
  )
}

const NewsList = ({ news }) => {
  return isNews ? isNews(news) : noNews();
}

export default NewsList;