
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TableData {
  player: string;
  time: string;
  event: string;
  status: 'success' | 'warning' | 'error';
}

interface DataTableProps {
  data: TableData[];
}

const DataTable = ({ data }: DataTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'bg-green-100 text-green-800 hover:bg-green-100',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      error: 'bg-red-100 text-red-800 hover:bg-red-100'
    };

    const labels = {
      success: 'Success',
      warning: 'Warning',
      error: 'Error'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{row.player}</TableCell>
                <TableCell className="text-gray-600">{row.time}</TableCell>
                <TableCell>{row.event}</TableCell>
                <TableCell>{getStatusBadge(row.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
