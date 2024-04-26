import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function submitReview() {
    const data = { title, description, stars, product: product._id };

    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadReviews() {
    setIsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setIsLoading(false);
    });
  }
  return (
    <div>
      <Title>Review</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitle>Add a review</Subtitle>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product review"
            />
            <div>
              <Button onClick={submitReview} primary={1}>
                Submit
              </Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle>All reviews</Subtitle>
            {isLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>No reviews for this product yet</p>}
            {reviews.length > 0 &&
              reviews.map((review, index) => (
                <ReviewWrapper key={index}>
                  <ReviewHeader>
                    <StarsRating
                      size={"sm"}
                      disabled={true}
                      defaultStar={review.stars}
                    />
                    <time>
                      {new Date(review.createdAt).toLocaleString("en-US")}
                    </time>
                  </ReviewHeader>
                  <h3 className="review-title">{review.title}</h3>
                  <p className="review-desc">{review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #cbd5e1;
  padding: 10px 0;
  .review-title {
    margin: 5px 0;
    font-size: 1rem;
    font-weight: normal;
  }
  .review-desc {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 0.75rem;
  }
`;
