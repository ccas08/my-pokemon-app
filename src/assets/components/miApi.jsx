import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

const MiApi = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        Promise.all(promises).then(pokemonDetails => {
          const pokemonData = pokemonDetails.map(detail => ({
            name: detail.name,
            image: detail.sprites.front_default,
            type: detail.types.map(t => t.type.name).join(', '),
            url: detail.species.url  // Asegúrate de que esta URL es la correcta según la API
          }));
          setPokemons(pokemonData);
        });
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar Pokémon"
          aria-label="Buscar Pokémon"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </InputGroup>
      <Row>
        {filteredPokemons.map(pokemon => (
          <Col key={pokemon.name} xs={12} md={4} lg={3}>
            <Card style={{ width: '18rem', marginBottom: '10px' }}>
              <Card.Img variant="top" src={pokemon.image} />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Card.Text>
                  Tipo: {pokemon.type}
                </Card.Text>
                <Button variant="primary">Más detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MiApi;
