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

import { searchChannelName } from './Miraview';

function deleteRequest(url: URL): void {
  fetch(url.href,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if(response.status == 200){
        toast("リクエスト成功");
      }else{
        toast("返り値: "+response.status.toString());
      }
    })
    .catch((error: Error) => {
      toast("リクエスト失敗: " + error.message);
      console.error(error)
    });
}


function CancelReservation(config?: MiraviewConfig,programId?: number): void{
  if(!config || !programId){
    return;
  }
  const endpoint = new URL('/api/recording/schedules/' + programId.toString(),config.mirakcUri);
  deleteRequest(endpoint);
}

function ReservedView(props: { config: MiraviewConfig, schedules?: Schedule[], services?: Service[] }): JSX.Element {
    if(!props.schedules || props.schedules.length === 0){
        return <Typography>予約がありません</Typography>;
    }
    // console.log(props.schedules);
    return (
        <Stack sx={{ margin: '1rem' }} spacing={2}>
          { props.schedules?.filter(schedule => schedule.state?.includes('scheduled'))
                                .map(reserve =>
          <Card key={reserve.program?.id?.toString()}>
            <CardHeader
              title={ reserve.program?.name } subheader={ reserve.state}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                    <React.Fragment key={reserve.program?.id?.toString()+"misc"}>
                        <tr><td>サービス</td><td>:</td><td>{ searchChannelName(reserve.program?.serviceId,props.services) }</td></tr>
                        <tr><td>優先度</td><td>:</td><td>{ reserve.options?.priority?.toString() }</td></tr>
                        <tr><td>保存先</td><td>:</td><td>{ reserve.options?.contentPath }</td></tr>
                    </React.Fragment>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <React.Fragment key={reserve.program?.id?.toString()+"dates"}>
                        <tr><td>開始</td><td>:</td><td>{ new Date(reserve.program?.startAt ?? 0 * 1000).toString() }</td></tr>
                        <tr><td>長さ</td><td>:</td><td>{ ((reserve.program?.duration ?? 0) /(60*1000) ) .toString() + "分" }</td></tr>
                    </React.Fragment>
                </Stack>
              </Stack>
              <Button onClick={() => CancelReservation(props.config,reserve.program?.id)}>キャンセル</Button>
            </CardContent>
          </Card>
          )}
        </Stack>
      );
}


export default ReservedView;