import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, TextField, Stack, Paper } from '@mui/material';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [windowSize, setWindowSize] = useState<number>(10);
  const [average, setAverage] = useState<number>(0);
  const [numberType, setNumberType] = useState<'F' | 'S' | 'R'>('F');

  const fetchNumber = async () => {
    try {
      // Using a mock API endpoint - replace with actual test server URL
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      const newNumber = response.data.number;
      
      setNumbers(prev => {
        const updated = [...prev, newNumber];
        if (updated.length > windowSize) {
          updated.shift(); // Remove oldest number if window size exceeded
        }
        return updated;
      });
    } catch (error) {
      console.error('Error fetching number:', error);
    }
  };

  useEffect(() => {
    // Calculate average whenever numbers array changes
    if (numbers.length > 0) {
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      setAverage(sum / numbers.length);
    }
  }, [numbers]);

  return (
    <Container maxWidth="sm">
      <Paper className="calculator-card" elevation={3} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#2c3e50',
            fontWeight: 600,
            mb: 4
          }}
        >
          Average Calculator
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography 
              variant="subtitle1" 
              gutterBottom
              sx={{ color: '#34495e', fontWeight: 500 }}
            >
              Window Size
            </Typography>
            <TextField
              type="number"
              value={windowSize}
              onChange={(e) => setWindowSize(Math.max(1, parseInt(e.target.value) || 1))}
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '8px',
                }
              }}
            />
          </Box>

          <Box>
            <Typography 
              variant="subtitle1" 
              gutterBottom
              sx={{ color: '#34495e', fontWeight: 500 }}
            >
              Number Type
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                className={`number-type-button ${numberType === 'F' ? 'active' : ''}`}
                variant={numberType === 'F' ? 'contained' : 'outlined'}
                onClick={() => setNumberType('F')}
                fullWidth
              >
                Fibonacci
              </Button>
              <Button
                className={`number-type-button ${numberType === 'S' ? 'active' : ''}`}
                variant={numberType === 'S' ? 'contained' : 'outlined'}
                onClick={() => setNumberType('S')}
                fullWidth
              >
                Square
              </Button>
              <Button
                className={`number-type-button ${numberType === 'R' ? 'active' : ''}`}
                variant={numberType === 'R' ? 'contained' : 'outlined'}
                onClick={() => setNumberType('R')}
                fullWidth
              >
                Random
              </Button>
            </Stack>
          </Box>

          <Button 
            variant="contained" 
            onClick={fetchNumber}
            sx={{
              backgroundColor: '#EEAECA',
              '&:hover': {
                backgroundColor: '#e091b6'
              },
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5
            }}
          >
            Get Next Number
          </Button>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              p: 2
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ color: '#34495e', fontWeight: 500 }}
            >
              Current Numbers:
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: '#2c3e50',
                fontFamily: 'monospace',
                fontSize: '1.1rem'
              }}
            >
              [{numbers.join(', ')}]
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(238, 174, 202, 0.2)',
              borderRadius: '8px',
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h5"
              sx={{ 
                color: '#2c3e50',
                fontWeight: 600
              }}
            >
              Average: {average.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
