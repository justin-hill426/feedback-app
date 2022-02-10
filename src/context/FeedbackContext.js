import {createContext, useEffect, useState} from 'react';

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [feedback, setFeedback] = useState([])

  // add feedback
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback();
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  }

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //update Feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'applications/json',
      },
      body: JSON.stringify(updItem);
    })

    const data = response.json();

    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
  }

  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE'});
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  }


  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback])
  }

  return <FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    isLoading,
    feedbackEdit,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;