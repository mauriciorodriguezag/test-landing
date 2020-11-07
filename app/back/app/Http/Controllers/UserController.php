<?php

namespace App\Http\Controllers;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Models\User;
use App\Exports\UsersExport;
use Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userSelected = null;
        $winnerValidate = User::where('winner', '=', 1)->first();
        try {
            $res = User::create($request->all());
        } catch (Exception $e) {
            $res = $e;
        }
        if (User::count() >= 5 && !$winnerValidate) {
            $userSelected = User::inRandomOrder()->limit(1)->update(['winner'=>true]);
        }
        // Si hay ganador trae la información para evitar dos consultas cada vez y traer el ganador lo antes posible, 
        // solo se ejecuta la consulta si se seleccionó el usuario al azar
        $winner = $userSelected ? User::where('winner', '=', 1)->first() : $winnerValidate;
        return response()->json([
            "response" => $res,
            "winner" => $winner
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showExcel()
    {   
        return base64_encode(Excel::download(new UsersExport, 'result.xlsx'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
