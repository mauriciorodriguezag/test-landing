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
        // Validate Regular Expressions Request Data
        if(preg_match('/[^A-Z|a-z|áéíóú]/',$request->all()['name'])){
            return response()->json([
                "error"=> 404,
                "response"=>[
                    "title"=> "Nombre incorrecto",
                    "text" => "Por favor ingrese solo caracteres validos."
                ]
            ]);
        }

        if(preg_match('/[^A-Z|a-z|áéíóú]/',$request->all()['lastname'])){
            return response()->json([
                "error"=> 404,
                "response"=>[
                    "title"=> "Apellido incorrecto",
                    "text" => "Por favor ingrese solo caracteres validos."
                ]
            ]);
        }

        if(preg_match('/[^0123456789]/',$request->all()['phone'])){
            return response()->json([
                "error"=> 404,
                "response"=>[
                    "title"=> "Número de celular incorrecto",
                    "text" => "Por favor ingrese solo caracteres validos."
                ]
            ]);
        }

        if(!filter_var($request->all()['mail'], FILTER_VALIDATE_EMAIL)){
            return response()->json([
                "error"=> 404,
                "response"=>[
                    "title"=> "Correo incorrecto",
                    "text" => "Por favor ingrese solo caracteres validos."
                ]
            ]);
        }
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
        return response()->json([
            "response" => $res
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
        return Excel::download(new UsersExport, 'report.xlsx');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showWinn()
    {   
        $winner = User::where('winner', '=', 1)->first();
        return response()->json([
            "winner" => $winner ? $winner : 'no-winner'
        ]);
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
