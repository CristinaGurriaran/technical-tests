import { useState } from 'react'
import EventForm from '../components/EventForm'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import EventIcon from '@mui/icons-material/Event'
import LockIcon from '@mui/icons-material/Lock'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import RefreshIcon from '@mui/icons-material/Refresh'
import ErrorIcon from '@mui/icons-material/Error'

type Event = {
  eventDescription: string
  eventType: string
  eventDate: string | undefined
  yearlyRepetition: boolean
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  const handleSubmit = (data: Event) => {
    setEvents([...events, data])
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4" color="text.primary" sx={{ fontWeight: 'bold', marginBottom: 6 }}>
          EMPA Event Planner
        </Typography>
        <EventForm onSubmit={handleSubmit} />
        <Typography variant="h6" sx={{ marginTop: 10, marginBottom: 4, color: 'text.primary', fontWeight: 'bold' }}>
          Your Upcoming Events
        </Typography>
        {events.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <ErrorIcon sx={{ color: '#1976D2', fontSize: '24px' }} />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Your events list is empty
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            {events.map((event, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  padding: '16px',
                  marginBottom: '16px',
                  width: '100%',
                  maxWidth: '300px',
                  border: '2px solid #BBDEFB',
                  margin: '0 auto'
                }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  Event id: #{index + 1}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {event.eventDescription}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {event.eventType === 'Private' ? (
                    <LockIcon sx={{ color: '#1976D2', marginRight: '4px', fontSize: '20px' }} />
                  ) : (
                    <BusinessCenterIcon sx={{ color: '#1976D2', marginRight: '4px', fontSize: '20px' }} />
                  )}
                  {event.eventType}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <EventIcon sx={{ color: '#1976D2', marginRight: '4px', fontSize: '20px' }} />
                  {event.eventDate ? new Date(event.eventDate).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <RefreshIcon sx={{ color: '#1976D2', marginRight: '4px', fontSize: '20px' }} />
                  Yearly recurrence: {event.yearlyRepetition ? 'Yes' : 'No'}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  )
}





