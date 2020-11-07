<?php
namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return User::all();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'lastname',
            'cédula',
            'Departamento',
            'Ciudad',
            'Celular',
            'Correo',
            'Autoriza manejo información',
            'Ganador promoción',
            'Fecha registro',
            'Fecha actualización de registro'
        ];
    }
}