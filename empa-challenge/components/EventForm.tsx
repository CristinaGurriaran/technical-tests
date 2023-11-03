import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { Stack } from '@mui/system'

type EventFormData = {
    eventDescription: string
    eventType: string
    eventDate: string | undefined
    yearlyRepetition: boolean
}

type EventFormProps = {
    onSubmit: (data: EventFormData) => void
}

const yesterday = dayjs().subtract(1, 'day').format()

export default function EventForm({ onSubmit }: EventFormProps) {
    const { control, handleSubmit, reset } = useForm<EventFormData>()
    const [events, setEvents] = useState<EventFormData[]>([])
    const [dateError, setDateError] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const onSubmitForm = handleSubmit((data) => {
        if (!data.eventDate) {
            setAnchorEl(document.getElementById('eventDateInput'))
            setDateError(true)
            return
        }

        setEvents([...events, data])
        setDateError(false)
        setAnchorEl(null)
        onSubmit(data)
        reset()
    })

    return (
        <Box component="form" onSubmit={onSubmitForm}>
            <Typography variant="subtitle2" color="primary">
                To create a new event, please complete the form:
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1">
                    Tell us about your event
                </Typography>
                <Controller
                    name="eventDescription"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            label="Event Description"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            {...field}
                        />
                    )}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                    What type of event is it?
                </Typography>
                <Controller
                    name="eventType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl fullWidth>
                            <Select
                                label="Type of Event"
                                {...field}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Choose an option
                                </MenuItem>
                                <MenuItem value="Private">Private</MenuItem>
                                <MenuItem value="Company">Company</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                    When will the event take place?
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="eventDate"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <DateTimePicker
                                    {...field}
                                    value={field.value || null}
                                    defaultValue={yesterday}
                                    disablePast
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    onChange={(value) => {
                                        field.onChange(value?.toString());
                                        setDateError(false);
                                    }}
                                />
                            </div>
                        )}
                    />
                </LocalizationProvider>
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormControl component="fieldset">
                    <Typography variant="subtitle1">
                        Is this an annual event?
                    </Typography>
                    <Controller
                        name="yearlyRepetition"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={field.value}
                                            onChange={() => field.onChange(true)}
                                        />
                                    }
                                    label="Yes"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={!field.value}
                                            onChange={() => field.onChange(false)}
                                        />
                                    }
                                    label="No"
                                />
                            </Stack>
                        )}
                    />
                </FormControl>
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    display: 'block',
                    width: '100%',
                    mt: 4
                }}
            >
                Submit
            </Button>

            <Divider sx={{ mt: 4 }} />
        </Box>
    )
}


