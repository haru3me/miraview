import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ToastContainer, toast } from 'react-toastify';

import type { MiraviewConfig, Program, Schedule, Service } from './types';

import { deleteRequest, searchChannelName } from './Miraview';

function StopRecording(config?: MiraviewConfig,programId?: number): void{
  if(!config || !programId){
    return;
  }
  const endpoint = new URL('/api/recording/recorders/' + programId.toString(),config.mirakcUri);
  deleteRequest(endpoint);
}

function RecordingView(props: { config: MiraviewConfig, schedules?: Schedule[], services?: Service[] }): JSX.Element {
    if(!props.schedules || props.schedules.length === 0){
        return <Typography>録画中番組がありません</Typography>;
    }
    // console.log(props.schedules);
    return (
        <Stack sx={{ margin: '1rem' }} spacing={2}>
          { props.schedules?.filter(schedule => schedule.state?.includes('recording'))
                                .map(record =>
          <Card key={record.program?.id?.toString()}>
            <CardHeader
              title={ record.program?.name } subheader={ record.state}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                    <React.Fragment key={record.program?.id?.toString()+"misc"}>
                        <tr><td>サービス</td><td>:</td><td>{ searchChannelName(record.program?.serviceId,props.services) }</td></tr>
                        <tr><td>優先度</td><td>:</td><td>{ record.options?.priority?.toString() }</td></tr>
                        <tr><td>保存先</td><td>:</td><td>{ record.options?.contentPath }</td></tr>
                    </React.Fragment>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <React.Fragment key={record.program?.id?.toString()+"dates"}>
                        <tr><td>開始</td><td>:</td><td>{ new Date(record.program?.startAt ?? 0 * 1000).toString() }</td></tr>
                        <tr><td>長さ</td><td>:</td><td>{ ((record.program?.duration ?? 0) /(60*1000) ) .toString() + "分" }</td></tr>
                    </React.Fragment>
                </Stack>
              </Stack>
              <Button onClick={() => StopRecording(props.config,record.program?.id)}>中止</Button>
            </CardContent>
          </Card>
          )}
        </Stack>
      );
}


export default RecordingView;