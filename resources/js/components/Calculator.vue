<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-body">
                        <h4><strong>NET WORTH CALCULATOR</strong></h4>
                        <p>Enter the monetary value of your assets and liabilities to determine your net worth</p>
                        <div class="row">
                            <div class="col-md-6">
                                <h4 class="text-center">ASSETS</h4>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Real Estate</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="assets.realestate" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Savings</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="assets.savings" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Retirement Account</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="assets.retirement" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Autos</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="assets.autos" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Others</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="assets.others" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h4 class="text-center">LIABILITIES</h4>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Mortage/Rent</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="liabilities.morgage" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Debt</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="liabilities.debt" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Personal Loans</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="liabilities.personalLoans" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Car Loans</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="liabilities.carLoans" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-4 col-form-label">Other Debt</label>
                                    <div class="col-sm-8">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">&#8358;</span>
                                            </div>
                                            <input type="number" @keyup="calcNetWorth" class="form-control" v-model.number="liabilities.otherDebt" placeholder="0.00">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <h4>
                                Current Net Worth: &#8358;
                                {{ netWorth }}
                            </h4>
                            <!-- <button class="btn btn-primary" @click="calcNetWorth">CALCULATE YOUR NET WORTH</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Welcome to MUSE NET WORTH CALCULATED')
        },
        data() {
            return {
                netWorth: 0,
                assets: {},
                liabilities: {}
            }
        },
        methods: {
            calcNetWorth() {
                let totalAsset = Number(this.assets.realestate ? this.assets.realestate : 0) + Number(this.assets.savings ? this.assets.savings : 0) + Number(this.assets.retirement ? this.assets.retirement : 0) + Number(this.assets.autos ? this.assets.autos : 0) + Number(this.assets.others ? this.assets.others : 0)
                let totalLiability = Number(this.liabilities.morgage ? this.liabilities.morgage : 0) + Number(this.liabilities.debt ? this.liabilities.debt : 0) + Number(this.liabilities.personalLoans ? this.liabilities.personalLoans : 0) + Number(this.liabilities.carLoans ? this.liabilities.carLoans : 0) + Number(this.liabilities.otherDebt ? this.liabilities.otherDebt : 0)
                this.netWorth = totalAsset - totalLiability
            }
        }
    }
</script>
