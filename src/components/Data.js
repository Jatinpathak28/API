import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Slide } from '@mui/material';

export const Data = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchResults]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.gyanibooks.com/library/get_dummy_notes');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setSearchTerm('');
  };
  

  return (
    <Container maxWidth="md">
    <div className='gap'>
      <form className="search-form" onSubmit={handleFormSubmit}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </form>
    <Button type="submit" className="vvd" onClick={handleFormSubmit}>
        <span>
            Search
        </span>
    </Button>
    </div>

      <TransitionGroup className="grid-container">
  {(searchResults.length > 0 ? searchResults : data).map((item, index) => (
    <CSSTransition key={item.id} classNames="fade" timeout={300}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="item-paper" elevation={3}>
          <Typography variant="h6" component="h3" className="item-title">
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.content}</Typography>
                <Router>
                  <Link to={item.link} target="_blank" rel="noopener noreferrer" className="external-link">
                    Visit Website
                    <FaExternalLinkAlt className="external-link-icon" />
                  </Link>
                </Router>
          </Paper>
        </Grid>
      </Slide>
    </CSSTransition>
  ))}
</TransitionGroup>

    </Container>
  );
};

