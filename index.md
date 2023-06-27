---
layout: layout.njk
---

# Pregnancy Risk Calculator

_A paragraph introducing the risk calculator. Something about what it is used for, what is can tell a user and what it cannot tell a user, that it's not medical advice, that it's based on US data and US populations, etc._

Privacy is very important to us. This risk calculator only runs in your browser, on your device, and never shares your answers with anyone else.

## When were you born?

<input type="date" name="date_of_birth" />

## What is your race?

> _Consider clearly explaining why race matters to this calculator and why selected race definitions were included or excluded_
>
> _Consider rewording questionnaire as a series of "Do you identify as [race category with elevated risk indicator]?"_
>
> _Consider carefully the ordering and implied precedence of items in this list_

Choose all that apply:

<label>
<input type="checkbox" name="race" value="white"> White
</label>

<label>
<input type="checkbox" name="race" value="african_american"> African American
</label>

<label>
<input type="checkbox" name="race" value="asian"> Asian
</label>

<label>
<input type="checkbox" name="race" value="native_american"> Native American
</label>

<label>
<input type="checkbox" name="race" value="hispanic"> Hispanic
</label>

<label>
<input type="checkbox" name="race" value="other"> Other
</label>

## Do you participate in the [WIC][wic] program?

<label>
<input type="radio" name="participates_in_wic" value="true"> Yes
</label>

<label>
<input type="radio" name="participates_in_wic" value="false"> No
</label>

[wic]: https://www.fns.usda.gov/wic

## Do you have [diabetes][diabetes]?

<label>
<input type="radio" name="has_diabetes" value="true"> Yes
</label>

<label>
<input type="radio" name="has_diabetes" value="false"> No
</label>

[diabetes]: https://www.cdc.gov/diabetes/basics/diabetes.html

## Do you have [hypertension][hypertension] (i.e., high blood pressure)?

<label>
<input type="radio" name="has_hypertension" value="true"> Yes
</label>

<label>
<input type="radio" name="has_hypertension" value="false"> No
</label>

[hypertension]: https://www.cdc.gov/bloodpressure/index.htm

## If you have had a previous pregnancy, what delivery methods have you used?

Choose all that apply. If none apply, do not check any items.

<label>
<input type="checkbox" name="previous_delivery_method" value="vaginal"> Vaginal
</label>

<label>
<input type="checkbox" name="previous_delivery_method" value="caesarean"> Caesarean section ("C-Section")
</label>

## Do you have any [sexually transmitted diseases][std]?

> _Consider preferring the term "sexually transmitted infection" https://www.plannedparenthood.org/blog/std-vs-sti-whats-the-difference_

<label>
<input type="radio" name="has_std" value="true"> Yes
</label>

<label>
<input type="radio" name="has_std" value="false"> No
</label>

[std]: https://www.cdc.gov/std/default.htm

<div class="risk_score_container">

# Your risk score

Based on your answers, your risk score is <span id="risk_score">N/A</span>, which means <span id="risk_score_description">TBD</span>.

</div>
<script type="text/javascript" src="assets/risk_calculator.js"></script>
